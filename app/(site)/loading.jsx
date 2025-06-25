export default function Loading() {
    return (
<div className="flex items-center justify-center h-screen bg-gray-100">
  <div className="relative w-24 h-24">
    <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
    <img
      src="/logo.png" 
      alt="Logo"
      className="absolute bg-black rounded-xl inset-0 w-16 h-16 m-auto"
    />
  </div>
</div>

    )
}
