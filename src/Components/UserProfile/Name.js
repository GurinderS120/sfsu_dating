const Name = ({ setName }) => {
  return <input type="text" onChange={(e) => setName(e.target.value)} />;
};

export default Name;
