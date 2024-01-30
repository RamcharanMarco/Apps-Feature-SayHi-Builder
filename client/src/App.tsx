import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [edit, setEdit] = useState(true);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [addPosition, setAddPosition] = useState(0);
  const [sectionType, setSectionType] = useState(`para`);
  const [paraContent, setParaContent] = useState(``);
  const [linkContent, setLinkContent] = useState(``);
  const [headingContent, setHeadingContent] = useState(``);
  const [photoContent, setPhotoContent] = useState(``);
  const [linkURL, setLinkURL] = useState(``)

  const [sections, setSections] = useState<any>([
    { id: `uuid`, type: "heading", content: "this is my heading", position: 1 },
  ]);

  const typesOfSections = [`photo`, `heading`, `para`, `link`];

  const addSection = (e: any, type: string, content: string) => {
    e.preventDefault();
    const newPosition: number = sections[sections.length - 1].position + 1;
    const myUUID = uuidv4();
    let obj = {
      id: myUUID,
      type: type,
      content: content,
      position: newPosition,
    };
    setSections((prev: any) => [...prev, obj]);
    setShowAddSectionModal(false);
  };

  const deleteSection = (e: any, sec: string) => {
    e.preventDefault();
    const newSections = sections.filter((section: any) => section !== sec);
    setSections(() => [...newSections]);
  };

  const moveUp = (e: any, id: string, cp: number) => {
    e.preventDefault();
    const newp = cp - 1;
    console.log(`section id: `, id);
    console.log(`current section position: `, cp);
    const newList = sections.map((element: any) => {
      if (element.position === newp) {
        return { ...element, position: cp };
      }
      if (element.id === id) {
        return { ...element, position: newp };
      } else {
        return element;
      }
    });

    newList.sort((a: any, b: any) => a.position - b.position);

    setSections([...newList]);
  };

  const moveDown = (e: any, id: string, cp: number) => {
    e.preventDefault();
    const newp = cp + 1;
    console.log(`section id: `, id);
    console.log(`current section position: `, cp);
    const newList = sections.map((element: any) => {
      if (element.position === newp) {
        return { ...element, position: cp };
      }
      if (element.id === id) {
        return { ...element, position: newp };
      } else {
        return element;
      }
    });

    newList.sort((a: any, b: any) => a.position - b.position);

    setSections([...newList]);
  };

  return (
    <div className="app">
      {showAddSectionModal ? (
        <div className="popup">
          <button onClick={() => setShowAddSectionModal(false)}>close</button>
          <h1>add section</h1>
          <p>choose type</p>
          {typesOfSections.map((section) => (
            <button key={section} onClick={() => setSectionType(section)}>
              {section}
            </button>
          ))}
          <hr />
          {sectionType === `para` ? (
            <div>
              <p>paragraph</p>
              <textarea
                value={paraContent}
                onChange={(e) => setParaContent(e.target.value)}
              ></textarea>
              <button
                onClick={(e) => {
                  addSection(e, `para`, paraContent);
                }}
              >
                save
              </button>
            </div>
          ) : sectionType === `link` ? (
            <div>
              <p>link</p>
              <textarea
                value={linkContent}
                onChange={(e) => setLinkContent(e.target.value)}
              ></textarea>
                            <textarea
                value={linkContent}
                onChange={(e) => setLinkURL(e.target.value)}
              ></textarea>
              <button
                onClick={(e) => {
                  addSection(e, `link`, linkContent);
                }}
              >
                save
              </button>
            </div>
          ) : sectionType === `heading` ? (
            <div>
              <p>heading</p>
              <textarea
                value={headingContent}
                onChange={(e) => setHeadingContent(e.target.value)}
              ></textarea>
              <button
                onClick={(e) => {
                  addSection(e, `heading`, headingContent);
                }}
              >
                save
              </button>
            </div>
          ) : sectionType === `photo` ? (
            <div>
              <p>photo</p>
              <textarea
                value={photoContent}
                onChange={(e) => setPhotoContent(e.target.value)}
              ></textarea>
              <button
                onClick={(e) => {
                  addSection(e, `photo`, photoContent);
                }}
              >
                save
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="nav">
        <button onClick={() => setEdit(true)}>edit</button>
        <button onClick={() => setEdit(false)}>preview</button>
        <button onClick={() => setEdit(false)}>save</button>
        {edit ? <p>edit mode true</p> : <p>preview mode</p>}
      </div>
      <div className="container">
        {sections.map((section: any) => (
          <div
            key={section.id}
            style={{ border: `1px solid black`, padding: `5px` }}
            className="center section"
          >
            <div className="hide-box">
              <button
                onClick={() => {
                  setShowAddSectionModal(true),
                    setAddPosition(section.position);
                }}
                className="hide"
              >
                add
              </button>
            </div>
            <div className="section-content">
              <p>type: {section.type}</p>
              {section.type === `para` ? (
                <p>section: {section.content}</p>
              ) : section.type === `heading` ? (
                <h1>section: {section.content}</h1>
              ) : section.type === `link` ? (
                <a href={section.url}>{section.content}</a>
              ) : (
                <p>section: {section.content}</p>
              )}
              <p>section: {section.position}</p>
              <button onClick={(e: any) => deleteSection(e, section)}>
                delete
              </button>
              {section.position === 1 ? null : (
                <button
                  onClick={(e) => moveUp(e, section.id, section.position)}
                >
                  move up
                </button>
              )}
              {section.position ===
              sections[sections.length - 1].position ? null : (
                <button
                  onClick={(e) => moveDown(e, section.id, section.position)}
                >
                  move down
                </button>
              )}
            </div>
            <div className="hide-box">
              <button
                onClick={() => {
                  setShowAddSectionModal(true),
                    setAddPosition(section.position + 1);
                }}
                className="hide"
              >
                add
              </button>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
