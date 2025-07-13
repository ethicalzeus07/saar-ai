import { currentUser } from '@clerk/nextjs/server';
import { UploadThingError } from 'uploadthing/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('upload completed for user id', metadata.userId);
      console.log('file url', file.ufsUrl); // use ufsUrl, not url
      // Optionally: save file info to your DB here
      return {
        userId: metadata.userId,
        file: {
          url: file.ufsUrl,
          name: file.name,
        },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;