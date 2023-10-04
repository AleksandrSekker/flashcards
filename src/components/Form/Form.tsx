import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';

import { schema } from '~/components/Form/Schema';
import { PrimaryButton } from '~/components/Button/Buttons';
import Image from 'next/image';
import { api } from '~/utils/api';

interface FormValues {
  word: string;
  meaning: string;
  examples: string;
  translation: string;
  image: string;
}
type FormProps = {
  // onSubmit: (data: FormValues) => void;
  className?: string;
  defaultValuesProp?: FormValues;
};

const Form = ({ className, defaultValuesProp }: FormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, defaultValues },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValuesProp,
  });
  const utils = api.useContext();
  const postFlashcard = api.flashcards.postCard.useMutation({
    onMutate: async (newEntry) => {
      await utils.flashcards.getAll.cancel();
      utils.flashcards.getAll.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newEntry, ...prevEntries];
        } else {
          return [newEntry];
        }
      });
    },
    onSettled: async () => {
      await utils.flashcards.getAll.invalidate();
    },
  });

  // const postFlashcard = api.flashcard.postCard.useMutation();
  const onSubmit = useCallback(async () => {
    postFlashcard.mutate({
      word: watch('word'),
      meaning: watch('meaning'),
      examples: watch('examples'),
      translation: watch('translation'),
      image: watch('image'),
    } as FormValues);
    removeResponseFromOpenAi();
  }, [postFlashcard, watch]);

  return (
    <form
      className={`flex w-full flex-col gap-2 ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="word"
        control={control}
        defaultValue={defaultValues?.word}
        render={({ field }) => (
          <Input
            title="Name"
            placeholder="Enter your name"
            type="text"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            errors={errors.word?.message}
          />
        )}
      />

      <Controller
        name="meaning"
        control={control}
        defaultValue={defaultValues?.meaning}
        render={({ field }) => (
          <Textarea
            title="Meaning"
            placeholder="Enter your meaning"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            errors={errors.meaning?.message}
          />
        )}
      />
      <Controller
        name="examples"
        control={control}
        defaultValue={defaultValues?.examples}
        render={({ field }) => (
          <Textarea
            title="Examples"
            placeholder="Enter your examples"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            errors={errors.examples?.message}
          />
        )}
      />
      <Controller
        name="translation"
        control={control}
        defaultValue={defaultValues?.translation}
        render={({ field }) => (
          <Input
            title="Translation"
            placeholder="Enter your translation"
            type="text"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            errors={errors.translation?.message}
          />
        )}
      />
      <Controller
        name="image"
        control={control}
        defaultValue={defaultValues?.image}
        render={({ field }) => (
          <>
            <Input
              title="Image"
              placeholder="Enter your image url"
              type="text"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              errors={errors.image?.message}
            />
            <Image
              className="my-2"
              src={field.value}
              alt={'image'}
              width={200}
              height={200}
            />
          </>
        )}
      />
      <PrimaryButton>Submit</PrimaryButton>
    </form>
  );
};

export default Form;
