import {
  type Control,
  type FieldValues,
  type FieldPath,
  type RegisterOptions,
  useController,
} from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  type SxProps,
  type Theme,
  type OutlinedInputProps,
} from '@mui/material';

interface CustomInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, FieldPath<TFieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label: React.ReactNode;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  sx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  inputProps?: OutlinedInputProps;
}

const CustomInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  type = 'text',
  sx = {},
  inputSx = {},
  labelSx = {},
  inputProps = {},
}: CustomInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const defaultPlaceholder = placeholder || '';
  const inputId = `${name}-input`;
  const labelId = `${name}-label`;
  const helperTextId = `${name}-helper-text`;
  // const inputValue = field.value ?? '';

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={!!error}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        ...sx,
      }}
    >
      <InputLabel
        htmlFor={inputId}
        id={labelId}
        shrink
        sx={{
          position: 'relative',
          transform: 'none',
          fontSize: '18px',
          fontWeight: 700,
          lineHeight: '24px',
          color: '#676767',
          mb: 1.5,
          '&.MuiInputLabel-shrink': {
            transform: 'none',
          },
          '&.Mui-focused': {
            color: '#676767',
          },
          ...labelSx,
        }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        {...field}
        value={field.value || ''}
        {...inputProps}
        id={inputId}
        type={type}
        placeholder={defaultPlaceholder}
        aria-describedby={error ? helperTextId : undefined}
        label={undefined}
        // value={inputValue}
        notched={false}
        sx={{
          width: '100%',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: '#F5F5F5',
          '& .MuiOutlinedInput-input': {
            padding: '12px',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
            borderRadius: '12px',
            color: 'text.primary',
            '&::placeholder': {
              color: '#CCCCCC',
              opacity: 1,
            },
            WebkitBoxShadow: '0 0 0 1000px #F5F5F5 inset',
            '&:-webkit-autofill': {
              WebkitTextFillColor: '#141414',
            },
            '&:-webkit-autofill:hover': {
              WebkitBoxShadow: '0 0 0 1000px #F5F5F5 inset',
              WebkitTextFillColor: '#141414',
            },
            '&:-webkit-autofill:focus': {
              WebkitBoxShadow: '0 0 0 1000px #F5F5F5 inset',
              WebkitTextFillColor: '#141414',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'error.main',
          },
          ...inputSx,
        }}
        {...inputProps}
      />
      {error && (
        <FormHelperText error id={helperTextId} sx={{ ml: 0.5 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;

/*
Usage Example:

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomInput from './components/CustomInput'; // Adjust the import path

interface MyFormData {
  firstName: string;
  lastName: string;
}

const MyForm: React.FC = () => {
  const { control, handleSubmit } = useForm<MyFormData>();

  const onSubmit: SubmitHandler<MyFormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput<MyFormData>
        name="firstName"
        control={control}
        label="First Name"
        rules={{ required: 'First name is required' }}
        // Optional: Add custom styles
        // sx={{ my: 2 }}
        // labelSx={{ color: 'primary.main' }}
        // inputSx={{ backgroundColor: 'background.paper' }}
      />

     <CustomInput<MyFormData>
        name="lastName"
        control={control}
        label="Last Name"
        placeholder="Enter your last name" // Optional custom placeholder
        rules={{ required: 'Last name is required' }}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

*/
