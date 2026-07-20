import { useId, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { InstantPhotoEditor, type CaptureFn, type FrameType } from '../src'
import {
  buttonStyle,
  choiceInputStyle,
  radioGroupHorizontalStyle,
  radioInlineStyle,
  storyRadioName,
} from './storyUi'

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof InstantPhotoEditor> = {
  title: 'Components/InstantPhotoEditor',
  component: InstantPhotoEditor,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof InstantPhotoEditor>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DISPLAY_WIDTHS: Record<FrameType, number> = {
  polaroid_600: 400,
  instax_mini: 280,
  instax_square: 360,
  instax_wide: 560,
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

// ---------------------------------------------------------------------------
// Upload + Delete story
// ---------------------------------------------------------------------------

function UploadDeletePanel() {
  const panelId = useId()
  const [src, setSrc] = useState<string | undefined>()
  const [capture, setCapture] = useState<CaptureFn | undefined>()
  const [frameType, setFrameType] = useState<FrameType>('polaroid_600')
  const [busy, setBusy] = useState(false)

  function handleUpload(file: File) {
    if (src) URL.revokeObjectURL(src)
    setSrc(URL.createObjectURL(file))
    setCapture(undefined)
  }

  function handleDelete() {
    if (src) URL.revokeObjectURL(src)
    setSrc(undefined)
    setCapture(undefined)
  }

  async function handleDownload() {
    if (!capture) return
    setBusy(true)
    try {
      const blob = await capture()
      if (!blob) return
      downloadBlob(blob, `instant-photo_${frameType}.png`)
    } finally {
      setBusy(false)
    }
  }

  const frameLabels: Record<FrameType, string> = {
    polaroid_600: 'Polaroid 600',
    instax_mini: 'Instax Mini',
    instax_square: 'Instax Square',
    instax_wide: 'Instax Wide',
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        padding: '0 12px',
      }}
    >
      <div style={radioGroupHorizontalStyle}>
        {(['polaroid_600', 'instax_mini', 'instax_square', 'instax_wide'] as FrameType[]).map(
          ft => (
            <label key={ft} style={radioInlineStyle}>
              <input
                type="radio"
                name={storyRadioName(panelId, 'frameType')}
                value={ft}
                checked={frameType === ft}
                style={choiceInputStyle}
                onChange={() => {
                  setFrameType(ft)
                  setCapture(undefined)
                }}
              />
              {frameLabels[ft]}
            </label>
          )
        )}
      </div>

      <InstantPhotoEditor
        key={`${frameType}-${src ?? 'empty'}`}
        src={src}
        frameType={frameType}
        width={DISPLAY_WIDTHS[frameType]}
        onUpload={handleUpload}
        onDelete={src ? handleDelete : undefined}
        onRender={fn => setCapture(() => fn)}
      />

      <button
        onClick={handleDownload}
        disabled={!capture || busy}
        style={{ ...buttonStyle(!capture || busy, false), fontSize: 13, minWidth: 220 }}
      >
        {busy ? 'Preparing…' : capture ? '⬇ Download' : src ? 'Rendering…' : 'Upload a photo first'}
      </button>

      <div style={{ fontSize: 11, color: '#aaa', fontStyle: 'italic', textAlign: 'center' }}>
        Click the frame area to upload · delete button appears after upload
      </div>
    </div>
  )
}

export const UploadAndDelete: Story = {
  name: '📷 Upload + Delete',
  render: () => <UploadDeletePanel />,
  parameters: { layout: 'padded' },
}

// ---------------------------------------------------------------------------
// Upload only (no delete)
// ---------------------------------------------------------------------------

function UploadOnlyPanel() {
  const [src, setSrc] = useState<string | undefined>()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <InstantPhotoEditor
        src={src}
        width={320}
        onUpload={file => {
          if (src) URL.revokeObjectURL(src)
          setSrc(URL.createObjectURL(file))
        }}
      />
      <div style={{ fontSize: 11, color: '#aaa', fontStyle: 'italic' }}>
        onUpload only — no delete button
      </div>
    </div>
  )
}

export const UploadOnly: Story = {
  name: '⬆ Upload only',
  render: () => <UploadOnlyPanel />,
  parameters: { layout: 'centered' },
}

// ---------------------------------------------------------------------------
// No callbacks (bare wrapper)
// ---------------------------------------------------------------------------

export const BareWrapper: Story = {
  name: '🖼 Bare wrapper (no upload/delete)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <InstantPhotoEditor width={320} />
      <div style={{ fontSize: 11, color: '#aaa', fontStyle: 'italic' }}>
        No onUpload / onDelete — identical to InstantPhotoImageEditor
      </div>
    </div>
  ),
  parameters: { layout: 'centered' },
}
