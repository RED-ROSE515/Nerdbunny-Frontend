const Loader = ({ className }: any) => {
  return (
    <div className={`'flex items-center' flex-row justify-center ${className}`}>
      <div className='spinner'>
        <div className='spinner1' />
      </div>
    </div>
  );
};

export default Loader;
