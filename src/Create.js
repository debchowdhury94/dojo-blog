import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Mario");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {title, author, body};
    setIsPending(true);

    fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
    }).then(() => {
        console.log("New blog added");
        setIsPending(false);
        navigate("/");
    })
  }

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Blog author:</label>
        <select value={author} 
        onChange={(e) => setAuthor(e.target.value)}>
          <option value="Mario">Mario</option>
          <option value="Yoshi">Yoshi</option>
          <option value="Dev">Dev</option>
        </select>
        {!isPending && <button type="sumbit">Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;
