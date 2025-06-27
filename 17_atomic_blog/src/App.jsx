import { createContext, useContext, useEffect, useState } from "react";
//import { PostProvider, PostContext } from './components/PostProvider';
import { PostProvider, usePosts } from './components/PostProvider';
//import { faker } from "@faker-js/faker";
import Test from './Test';


/*
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
*/

function App() {
  /*
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  */

  /*
  const x = usePosts();
  console.log(x);
  */  // throw new Error('PostContext was used outside of the PostProvider')
  
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>
        <PostProvider>
          <Header />
          <Main />
          <Archive />
          <Footer />
        </PostProvider>  
    </section>
  );
}

{/*function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {*/}
function Header() {
  // 3) Consuming the context Value:
  //const { onClearPosts } = useContext(PostContext);
  const { onClearPosts } = usePosts();
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>{/*
        <Results posts={posts} />
        <SearchPosts searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        */}
        <Results />
        <SearchPosts />
      </div>
      <div>
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

{/*function SearchPosts({ searchQuery, setSearchQuery }) {*/}
function SearchPosts() {
  //const { searchQuery, setSearchQuery } = useContext(PostContext);
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

{/*function Results({ posts }) {*/}
function Results() {
  // 3) 🌟 CONSUMING THE CONEXT VALUE 🌟
  //const { posts } = useContext(PostContext);
  const { posts } = usePosts();

  //return <p>🚀 {posts.length} atomic posts found</p>;
  return (
    <p>
      🚀 {posts ? posts.length : 0} atomic posts found
    </p>
  );
}

//function Main({ posts, onAddPost }) {
function Main() {
  return (
    <main>
      <FormAddPost/>
      <Posts />
    </main>
  );
}

//function Posts({ posts }) {
function Posts() {
  // 3) 🌟 CONSUMING THE CONEXT VALUE 🌟
  //const { posts } = useContext(PostContext);
  const { posts } = usePosts();
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}

//function FormAddPost({ onAddost }) {
function FormAddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // 3) 🌟 CONSUMING THE CONEXT VALUE 🌟
  //const { onAddPost } = useContext(PostContext);
  const { onAddPost } = usePosts();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

//function List({ posts }) {
function List() {

  // 3) 🌟 CONSUMING THE CONEXT VALUE 🌟
  //const { posts } = useContext(PostContext);
  const { posts } = usePosts();
  return (
    <>
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
    <Test />
    </>
  );
}

//function Archive({ onAddPost }) {
function Archive() {
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉

  // 3) 🌟 CONSUMING THE CONEXT VALUE 🌟
  //const { onAddPost, createRandomPost } = useContext(PostContext);
  const { onAddPost, createRandomPost } = usePosts();
  
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
