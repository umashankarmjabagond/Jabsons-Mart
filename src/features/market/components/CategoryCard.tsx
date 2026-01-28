const CategoryCard = ({ group }: any) => {
  return (
    <div className="bg-green-50 rounded-xl p-4 hover:shadow transition">
      <h3 className="font-semibold mb-3">{group.title}</h3>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item: string, idx: number) => (
          <span
            key={idx}
            className="px-3 py-1 bg-white rounded-full text-sm border"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
