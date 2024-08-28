import CommentContainer from "./components/CommentContainer";
import WaterContainer from "./components/WaterContainer";

export default function Home() {
  return (
    <main className="main">
      <WaterContainer />
      <CommentContainer />
    </main>
  );
}
