import type { CSSProperties } from 'react'

export const fieldsetStyle: CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 6,
  padding: '10px 14px',
  margin: 0,
}

export const compactFieldsetStyle: CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 6,
  padding: '6px 10px 8px',
  margin: 0,
}

export const legendStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#888',
  padding: '0 4px',
}

export const controlRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '6px 10px',
  marginTop: 4,
}

export const controlRowLabelStyle: CSSProperties = {
  flex: '0 0 auto',
  fontSize: 11,
  fontWeight: 600,
  color: '#666',
  minWidth: 52,
}

export const radioGroupWrapStyle: CSSProperties = {
  display: 'flex',
  flex: '1 1 160px',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '2px 10px',
  minWidth: 0,
}

export const radioRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 13,
  cursor: 'pointer',
  padding: '5px 4px',
  minHeight: 28,
  userSelect: 'none',
}

export const radioGroupHorizontalStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px 12px',
  fontSize: 13,
  maxWidth: '100%',
}

export const radioInlineStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
  padding: '2px 6px',
  userSelect: 'none',
  whiteSpace: 'nowrap',
}

/** Keeps radios/checkboxes visible and easy to tap in Storybook docs. */
export const choiceInputStyle: CSSProperties = {
  width: 14,
  height: 14,
  margin: 0,
  flexShrink: 0,
  cursor: 'pointer',
}

export function buttonStyle(disabled: boolean, fullWidth = true): CSSProperties {
  return {
    padding: '10px 20px',
    borderRadius: 6,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? '#ccc' : '#1a1a1a',
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    ...(fullWidth ? { width: '100%' } : {}),
  }
}

/** Unique radio group name — avoids cross-story interference on docs pages. */
export function storyRadioName(panelId: string, group: string): string {
  return `${panelId}-${group}`
}
