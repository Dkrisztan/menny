import { createFileRoute } from '@tanstack/react-router'
import { FileText } from 'lucide-react'

export const Route = createFileRoute('/content')({
  component: ContentPage,
})

function ContentPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold">Content Management</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Manage your homepage content, sections, and text from here. This feature is coming soon.
      </p>
    </div>
  )
}
