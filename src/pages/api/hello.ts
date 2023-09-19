import openai from '~/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  text: string;
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            "How is the word 'exposed' used in English? Explain its meaning and give me 3 examples in context at a B2 level",
        },
      ],
    });
    const image = await openai.createImage({
      prompt: 'exposed',
      n: 1,
      size: '1024x1024',
    });
    res.status(200).json({
      text: completion.data,
      image: image.data.data[0].url,
    });
    res.status(200).json({
      text: completion.data.choices[0].message.content,
      image: image.data.data[0].url,
    });
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
