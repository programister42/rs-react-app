import cn from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Work } from '../api/models';
import { safeFetch, safeFetchBlob } from '../api/safe-fetch';
import { OPEN_LIBRARY_COVERS_BY_ID_API, OPEN_LIBRARY_URL } from '../api/urls';
import { Card } from '../components/Card';
import { ErrorContext } from '../components/ErrorBoundary';
import { Loader } from '../components/Loader';

const IMAGE_SIZE: 'S' | 'M' | 'L' = 'L';

export function DetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, workId } = useParams();
  const { setError } = useContext(ErrorContext);
  const [work, setWork] = useState<Work>();
  const [image, setImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const workUrl = `${OPEN_LIBRARY_URL}/${category}/${workId}.json`;
      const { error: workError, data: workData } =
        await safeFetch<Work>(workUrl);
      if (workError) {
        setError(workError);
        setIsLoading(false);
        return;
      }

      const firstCoverId = workData?.covers?.[0];
      if (!firstCoverId) {
        setWork(workData);
        setIsLoading(false);
        return;
      }

      const imageUrl = `${OPEN_LIBRARY_COVERS_BY_ID_API}/${firstCoverId}-${IMAGE_SIZE}.jpg`;
      const { error: imageError, data: imageData } =
        await safeFetchBlob(imageUrl);

      if (imageError) {
        setWork(workData);
        setIsLoading(false);
        return;
      }

      const imageSrcUrl = URL.createObjectURL(imageData);
      setImage(imageSrcUrl);
      setWork(workData);
      setIsLoading(false);
    })();
  }, [category, workId, setError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        const searchParams = new URLSearchParams(location.search).toString();
        const searchParamsString = searchParams ? `?${searchParams}` : '';
        navigate(`/search${searchParamsString}`);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigate, location.search]);

  return (
    <div ref={cardRef} className="h-full">
      <Card className="relative isolate min-w-40">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {image && (
              <img
                src={image}
                alt="book cover"
                draggable={false}
                className="absolute inset-0 -z-10 size-full object-cover object-center brightness-30 md:object-center"
              />
            )}
            <h3
              className={cn('text-sm/6 font-semibold', {
                'text-white': image,
                'text-gray-900': !image,
              })}
            >
              {work?.title}
            </h3>
            <p
              className={cn('mt-1 overflow-auto text-xs/5', {
                'text-gray-200': image,
                'text-gray-500': !image,
              })}
            >
              {work?.description &&
                (typeof work?.description === 'string'
                  ? work.description
                  : work?.description.value)}
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
