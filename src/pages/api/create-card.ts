import openai from '~/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import type OpenAI from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { word } = req.query; // Assuming you pass the word as a query parameter

    if (!word) {
      return res.status(400).json({ error: 'Word parameter is missing' });
    }
    const paramsMeaning: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `How is the word '${word}' used in English? Explain its meaning  at a B2 level`,
        },
      ],
    };
    const paramsSentence: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Give me 3 sentences with the word '${word} at a B2 level'`,
        },
      ],
    };
    const paramsTranslation: OpenAI.Chat.ChatCompletionCreateParams = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Translate the word '${word}'into Ukrainian`,
        },
      ],
    };
    const meaningWord: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(paramsMeaning);

    const sentenceExample: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(paramsSentence);
    const wordTranslation: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(paramsTranslation);

    const image = await openai.images.generate({
      prompt: word as string,
      n: 1,
      size: '1024x1024',
    });

    res.status(200).json({
      word: typeof word === 'string' ? word.trim() : word,
      meaning: meaningWord.choices[0] && meaningWord.choices[0].message.content,
      examples:
        sentenceExample.choices[0] &&
        sentenceExample.choices[0].message.content,
      translation:
        wordTranslation.choices[0] &&
        wordTranslation.choices[0].message.content,
      image: image.data[0] && image.data[0].url,
    });
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
