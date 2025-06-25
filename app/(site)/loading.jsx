import ProductSkeleton from '../components/ProductSkeleton';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <div className="animate-pulse bg-gray-200 h-8 rounded-lg w-64 mx-auto mb-4"></div>
                    <div className="animate-pulse bg-gray-200 h-4 rounded-lg w-48 mx-auto"></div>
                </div>
                
                {/* Products Skeleton */}
                <ProductSkeleton count={12} />
            </div>
        </div>
    )
}
