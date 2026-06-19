import { Loader2 } from 'lucide-react'

export default function PageLoadingSpinner({ caption = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f19]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        {caption && (
          <p className="text-sm font-medium text-[#9fadbc] tracking-wide animate-pulse">
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}
