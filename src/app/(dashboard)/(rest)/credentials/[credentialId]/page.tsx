import { CredentialView } from "@/features/credentials/components/credential";
import { CredentialsError, CredentialsLoading } from "@/features/credentials/components/credentials";
import { prefetchCredential } from "@/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    credentialId: string;
  }>
};

const Page = async ({ params }: PageProps) => {
  await requireAuth();

  const { credentialId } = await params;

  try {
    await prefetchCredential(credentialId);
  } catch {
    // If prefetch fails (e.g. credential not found), let the client-side
    // ErrorBoundary handle it when the query re-runs on the client.
  }

  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-md w-full flex flex-col gap-y-8 h-full">
        <HydrateClient>
          <ErrorBoundary fallback={<CredentialsError />}>
            <Suspense fallback={<CredentialsLoading />}>
              <CredentialView credentialId={credentialId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  )
};

export default Page;