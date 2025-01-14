import "./App.css";
import { useState } from "react";
import PropTypes from "prop-types";
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
  {
    title: "Added validation for curOpen and onOpen props.",
    text: "Perferendis non ut suscipit temporibus voluptatem, molestias ex recusandae expedita impedit consequuntur nulla nisi? Repellendus, facere voluptate!. Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
];

console.log(faqs);

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((el, index) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          key={el.title}
          title={el.title}
          num={index}
        >
          {el.text}
        </AccordionItem>
      ))}

      <AccordionItem
        curOpen={curOpen}
        onOpen={setCurOpen}
        key="Test 01"
        title="Test 01"
        num={19}
      >
        <p>Allows React developers to:</p>
        <ul>
          <li>Break up UI into components</li>
          <li>Make components reusable</li>
          <li>Place state efficiently</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

const AccordionItem = ({ num, title, curOpen, onOpen, children }) => {
  //const [isOpen, setIsOpen] = useState(false);
  const isOpen = num === curOpen;

  function handleToggle() {
    //setIsOpen((isOpen) => !isOpen);
    /*
    when  const [curOpen, setCurOpen] = useState(null); => each card is closed
    isOpen ? null : num means:
    if isOpen == true after user clicks on card then card closes
    if isOpen == false || null after user clicks on card then card opens
     */
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
};

/************** PROPS Types **************/
Accordion.propTypes = {
  data: PropTypes.array.isRequired,
};

AccordionItem.propTypes = {
  num: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  curOpen: PropTypes.number,
  onOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
