// SelectionPage.tsx
import React, { useEffect, useState } from 'react';
import { getAllSelections } from './../../services/selection';

interface Selection {
  number: number;
  name: string;
  gender: string;
}

interface SelectionPageProps {
  gender: 'boy' | 'girl'; // Adjust to match the expected gender values
}

const SelectionPage: React.FC<SelectionPageProps> = ({ gender = 'boy' }) => {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const data = await getAllSelections(gender);
        console.log(data.data);
        setSelections(data.data);
      } catch (err) {
        setError('Failed to fetch selections');
      } finally {
        setLoading(false);
      }
    };

    fetchSelections();
  }, [gender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{gender === 'boy' ? 'Boys' : 'Girls'} Selection</h1>
      <ul>
        {selections.map((selection) => (
          <li key={selection.number}>
            {selection.number}. {selection.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectionPage;
