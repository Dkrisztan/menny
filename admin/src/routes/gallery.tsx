import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Upload, Trash2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { api } from '@/lib/api'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

interface GalleryImage {
  id: string
  key: string
  url: string
  filename: string
  mimeType: string
  size: number
  createdAt: string
}

function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const loadImages = () => {
    api.get<GalleryImage[]>('/gallery').then(setImages).catch(() => {})
  }

  useEffect(() => { loadImages() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const { uploadUrl, key } = await api.post<{ uploadUrl: string; key: string }>('/upload/presign', {
        filename: file.name,
        contentType: file.type,
      })

      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      })

      const image = await api.post<GalleryImage>('/upload/confirm', {
        key,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
      })

      setImages((prev) => [image, ...prev])
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  const removeImage = async (id: string) => {
    try {
      await api.del(`/gallery/${id}`)
      setImages((prev) => prev.filter((img) => img.id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload image'}
          </Button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images uploaded yet.</p>
          <p className="text-sm mt-1">Use the "Upload image" button to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <Card key={img.id} className="overflow-hidden group relative">
              <img src={img.url} alt={img.filename} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => copyUrl(img.url)}>
                  {copied === img.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button size="icon" variant="destructive" onClick={() => removeImage(img.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-2 text-xs text-muted-foreground truncate">{img.filename}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
