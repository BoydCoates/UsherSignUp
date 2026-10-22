import { createContext, useContext, useId } from 'react'
import { homeFieldLabels } from './homeTextFields'

export const HomeEditingContext = createContext(null)

export function HomeLink({ children, className = '', href, target, rel, ...props }) {
  const { onChange } = useContext(HomeEditingContext)
  return onChange
    ? <span className={`${className} uh-editable-link`} {...props}>{children}</span>
    : <a href={href} target={target} rel={rel} className={className} {...props}>{children}</a>
}

export function HomeText({ field, placeholder }) {
  const { content, onChange, pending } = useContext(HomeEditingContext)
  const descriptionId = useId()
  const value = content[field] ?? ''
  if (!onChange) return value
  const label = homeFieldLabels[field] || field
  return <span className="uh-inline-field">
    <span className="uh-inline-size" aria-hidden="true">{value || placeholder || label}{'\u200b'}</span>
    <textarea
      aria-label={label}
      aria-describedby={descriptionId}
      value={value}
      placeholder={placeholder || label}
      maxLength={field.endsWith('Description') ? 2000 : 200}
      disabled={pending}
      rows={1}
      cols={1}
      onChange={event => onChange(field, event.target.value)}
      onClick={event => event.stopPropagation()}
    />
    <span id={descriptionId} className="uh-sr-only">Edit this text directly on the page. Save changes using the toolbar.</span>
  </span>
}
