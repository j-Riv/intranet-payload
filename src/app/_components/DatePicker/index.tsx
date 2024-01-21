import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'

import classes from './index.module.scss'

export type Props = {
  control: any
  name: string
  label: string
  required: boolean
  error: any
  placeholder?: string
}

export const DatePicker: React.FC<Props> = ({
  control,
  name,
  label,
  required,
  error,
  placeholder = 'Select Date',
}) => {
  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  return (
    <div className={classes.inputWrap}>
      <label htmlFor="name" className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ''}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <ReactDatePicker
            selected={field.value}
            onChange={date => field.onChange(date)}
            filterDate={isWeekday}
            placeholderText={placeholder}
          />
        )}
      />
      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required'
            ? 'This field is required'
            : error?.message}
        </div>
      )}
    </div>
  )
}
