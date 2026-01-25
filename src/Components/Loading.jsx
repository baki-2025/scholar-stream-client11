const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold"><span className="loading loading-spinner text-info"></span>
<span className="loading loading-spinner text-warning"></span>
<span className="loading loading-spinner text-error"></span>
</p>
    </div>
  );
};

export default Loading;
