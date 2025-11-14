import StarRating from "./components/StarRating";

const App = () => {
  return (
    <div>
      <StarRating
        maxRating={5}
        onSetRating={(rate) => {
          console.log(rate);
        }}
        messages={["😡", "😠", "😐", "🙂", "😊"]}
        className=""
        defaultRating={0}
        size={50}
      />
    </div>
  );
};

export default App;
