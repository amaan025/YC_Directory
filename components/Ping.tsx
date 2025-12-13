const Ping = () => {
    return (
        <span className="relative flex size-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
      <span className="relative inline-flex h-full w-full rounded-full bg-red-500" />
    </span>
    );
};

export default Ping;
