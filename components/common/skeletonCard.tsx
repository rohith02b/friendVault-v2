import { Skeleton } from '../ui/skeleton';

export const renderSkeletons = () => {
  return [1, 2, 3].map((each) => (
    <div key={each}>
      <Skeleton className='h-32' />
    </div>
  ));
};
