import useVictim from '../hooks/useVictim';

export const Loader = () => {
  const { isLoading, error } = useVictim();

  return (
    <div className='spinner'>
      {isLoading && <img src='/spinner2.gif' height='450' />}

      {error &&
        <div className='error'>
          <h1>je to v piči</h1>
          <p className='error-message'>{error}</p>
        </div>}
    </div>
  );
};