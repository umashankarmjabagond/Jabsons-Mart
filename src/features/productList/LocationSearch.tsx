import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocateFixed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION_SEARCH } from "@/constants/textConstants";
import { Button } from "@/components/common/ui/Button";
import { fetchProducts } from "@/redux/productSlice";
import { RootState, AppDispatch } from "@/redux/store";

const LocationSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const routeLocation = useLocation();
  const navigate = useNavigate();

  const products = useSelector(
    (state: RootState) => state.products.allProducts,
  );

  const [activeCity, setActiveCity] = useState("");

  // const pillContainerRef = useRef<HTMLDivElement>(null);
  const initializedFromParamRef = useRef(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const cities = useMemo(() => {
    if (!products.length) return [];
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.location) set.add(p.location.split(" - ")[0].trim());
    });
    return Array.from(set).sort();
  }, [products]);

  useEffect(() => {
    if (cities.length && !initializedFromParamRef.current && !activeCity) {
      setActiveCity(cities[0]);
    }
  }, [cities, activeCity]);

  useEffect(() => {
    const search = routeLocation.search;
    const params = new URLSearchParams(search);
    const locParam = params.get("location");

    if (locParam) {
      const decoded = decodeURIComponent(locParam.replace(/\+/g, " "));
      const cityFromParam = decoded.split("-")[0].trim();
      if (cityFromParam) {
        setActiveCity(cityFromParam);
        initializedFromParamRef.current = true;
      }
    } else {
      // No location param → clear selection and remove from localStorage
      setActiveCity("");
      initializedFromParamRef.current = false;
      try {
        localStorage.removeItem("selectedLocation");
      } catch (err) {
        console.log("Failed to remove location from localStorage", err);
      }
    }
  }, [routeLocation.search]);

  const handleNearbyBtnClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "Unknown location";
          setActiveCity(city);
          setUrlLocationParam(city);
        } catch {
          console.error("Failed to get location from coordinates");
        }
      },
      () => {
        alert("Unable to retrieve your location");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const setUrlLocationParam = (city: string) => {
    const params = new URLSearchParams(routeLocation.search);

    const encoded = encodeURIComponent(city).replace(/%20/g, "+");
    params.set("location", encoded);
    navigate(
      { pathname: routeLocation.pathname, search: `?${params.toString()}` },
      { replace: true },
    );

    try {
      localStorage.setItem("selectedLocation", city);
    } catch {
      //
    }
  };

  return (
    <div className="flex w-full px-4 pt-2 gap-4">
      <p className="text-xxl font-poppins text-left">
        {LOCATION_SEARCH.PRODUCTS} {LOCATION_SEARCH.NEAR_ME} {activeCity}
      </p>

      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Button
            type="button"
            onClick={handleNearbyBtnClick}
            variant="ghost"
            size="sm"
            className="px-2 py-0.5 rounded-full text-xs bg-blue-600 hover:bg-blue-900 text-white border border-blue-600"
          >
            <span className="inline-flex items-center gap-2 text-xs">
              <LocateFixed className="w-3 h-3 sm:w-3 sm:h-3" />
              {LOCATION_SEARCH.NEAR_ME} me
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
