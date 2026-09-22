export const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse w-full">
    <div className="flex justify-between items-start mb-4">
      <div className="w-1/2">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-24"></div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-8 bg-gray-200 rounded w-24"></div>
    </div>
  </div>
);

export const SkeletonRow = ({ columns = 5 }) => (
  <tr className="animate-pulse border-b border-gray-100 last:border-0">
    {[...Array(columns)].map((_, i) => (
      <td key={i} className="p-4">
        <div className={h-4 bg-gray-200 rounded \}></div>
      </td>
    ))}
  </tr>
);
