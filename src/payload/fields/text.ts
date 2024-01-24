import type { Field } from 'payload/types'

export const appearanceOptions = {
  heading: {
    label: 'Heading',
    value: 'heading',
  },
  lead: {
    label: 'Lead',
    value: 'lead',
  },
  copy: {
    label: 'Copy',
    value: 'copy',
  },
  fine: {
    label: 'Fine',
    value: 'fine',
  },
  default: {
    label: 'Default',
    value: 'default',
  },
}

export type TextAppearances = 'Heading' | 'Lead' | 'Copy' | 'Fine' | 'Default'

type TextType = (options?: { label: string; name: string; required?: boolean }) => Field

const text: TextType = ({ label, name, required = false }) => {
  const appearanceOptionsToUse = [
    appearanceOptions.default,
    appearanceOptions.heading,
    appearanceOptions.lead,
    appearanceOptions.copy,
    appearanceOptions.fine,
  ]

  const textResult: Field = {
    name: name,
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'appearance',
        type: 'select',
        defaultValue: 'default',
        options: appearanceOptionsToUse,
        admin: {
          description: 'Choose how the text should be rendered.',
        },
      },
      {
        name: 'value',
        type: 'text',
        required: required,
        label: label,
      },
    ],
  }

  return textResult
}

export default text
