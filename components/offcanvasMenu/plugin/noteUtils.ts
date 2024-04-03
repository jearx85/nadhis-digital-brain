import { v4 as uuidv4 } from 'uuid';
import markdownIt from 'markdown-it';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function generateUUID(): string {
  return uuidv4();
}


