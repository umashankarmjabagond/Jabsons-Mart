import FilterSlideBar from '@/features/productlist/FilterSlideBar'
import React from 'react'

const SearchLayout:React.FC = () => {
  return (
    <div className="h-screen w-600px flex flex-col">
      <header className="flex-[1] border-2 text-black flex items-center px-6 font-bold text-lg">
        Farmer Mart
      </header>
 
      <nav className="flex-[1] border-2 text-black flex items-center px-6 font-medium">
        📍 Location:Bangalore, India
      </nav>
 
      <div className="flex-[8] flex w-full">

       
         <FilterSlideBar/>
       
 
        <main className="w-4/5 border-2 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to Farmer Mart
          </h2>
          <p className="text-gray-700">
            This is your main container. Add dashboards, tables, or product
            listings here.
          </p>
        </main>
      </div>
    </div>

  )
}

export default SearchLayout
