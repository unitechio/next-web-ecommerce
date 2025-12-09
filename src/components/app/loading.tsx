import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <LoadingSpinner size="large" />
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    </div>
  )
}
