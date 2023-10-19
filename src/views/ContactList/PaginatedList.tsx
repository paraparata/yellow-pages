import Button from '@/components/primitive/Button';
import ContactMiniCard from './ContactMiniCard';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import type { ContactData } from '@/components/base/ContactForm';

interface PaginatedListProps {
  data: ({ id: number } & ContactData)[];
  isLoading: boolean;
  page: number;
  isLastPage: boolean;
  onChangePage: (newPage: number) => void;
}

const PaginatedList: React.FC<PaginatedListProps> = ({
  data,
  isLoading,
  page,
  isLastPage,
  onChangePage,
}) => {
  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ul css={{ margin: 0, padding: 0 }}>
        {data.map((person, index) => {
          return (
            <li key={index} css={{ padding: '0.5rem 0', listStyle: 'none' }}>
              <ContactMiniCard
                id={person.id}
                fullName={person.first_name + ' ' + person.last_name}
                phones={person.phones}
              />
            </li>
          );
        })}
      </ul>

      <div
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <Button
          variant='icon'
          disabled={isLoading || page === 1}
          onClick={() => onChangePage(page - 1)}
        >
          <CaretLeft size={16} color='#dc3838' weight='light' />
        </Button>
        <span>{page}</span>
        <Button
          variant='icon'
          disabled={isLoading || isLastPage}
          onClick={() => onChangePage(page + 1)}
        >
          <CaretRight size={16} color='#dc3838' weight='light' />
        </Button>
      </div>
    </div>
  );
};

export default PaginatedList;
