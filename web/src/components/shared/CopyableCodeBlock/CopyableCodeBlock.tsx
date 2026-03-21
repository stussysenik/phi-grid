import React from 'react'
import { CodeSnippet } from '@carbon/react'

interface CopyableCodeBlockProps {
  code: string
  language?: string
}

const CopyableCodeBlock: React.FC<CopyableCodeBlockProps> = ({ code, language = 'css' }) => {
  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", maxHeight: 'calc(var(--sp-3xl) * 4)' }}>
      <CodeSnippet type="multi" feedback="Copied!">
        {code}
      </CodeSnippet>
    </div>
  )
}

export default CopyableCodeBlock
