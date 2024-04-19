import { isBoolean, isNumber, isObject, isString } from "../../../../../utils";
import { Blue, Red, Purple, Margin, Black, Green } from "./styles";

type Props = {
  children: { [key: string]: any };
}

const PrettifyObject = ({ children }: Props): React.ReactNode => {
  if (!isObject(children)) return <></>;

  const prettify = (object: { [key: string]: any }, depth: number = 1) => {
    if (Array.isArray(object)) {
      return (
        <>
          <Black>[</Black>
          <br />
          {object.map((item, index) => (
            <Margin key={index} depth={depth}>
              {isNumber(item) ? (
                <Green>{item}</Green>
              ) : isBoolean(item) ? (
                <Purple>{item.toString()}</Purple>
              ) : isString(item) ? (
                <Blue>
                  <Red>"</Red>
                  {item}
                  <Red>"</Red>
                </Blue>
              ) : isObject(item) ? (
                prettify(item, depth + 1)
              ) : (
                JSON.stringify(item)
              )}
              {index !== object.length - 1 && (
                <>
                  ,
                  <br />
                </>
              )}
            </Margin>
          ))}
          <br />
          <Margin depth={depth - 1}>
            <Black>]</Black>
          </Margin>
        </>
      );
    } else {
      if (!object) return null;
      const keys = Object.keys(object);
      return (
        <>
          <Black>{"{"}</Black>
          <br />
          {keys.map((key, index) => (
            <Margin key={key} depth={depth}>
              <Red>"{key}"</Red>
              <Black>:</Black>{" "}
              {isNumber(object[key]) ? (
                <Green>{object[key]}</Green> // Numbers are printed Green
              ) : isBoolean(object[key]) ? (
                <Purple>{object[key].toString()}</Purple> // Booleans are purple
              ) : isString(object[key]) ? (
                <Blue>"{object[key]}"</Blue> // Strings are blue
              ) : isObject(object[key]) ? (
                prettify(object[key], depth + 1)
              ) : (
                JSON.stringify(object[key])
              )}
              {index !== keys.length - 1 ? (
                <Black>
                  ,
                  <br />
                </Black>
              ) : (
                <></>
              )}
            </Margin>
          ))}
          <br />
          <Margin depth={depth - 1}>
            <Black>{"}"}</Black>
          </Margin>
        </>
      );
    }
  };

  return <div>{prettify(children)}</div>;
};

export default PrettifyObject;
