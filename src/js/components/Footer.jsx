import { useContext } from "react";
import tinycolor from "tinycolor2";
import { AppContext } from "../store";
import { GoMarkGithub } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";

const Footer = () => {
  const { backgroundColor, foregroundColor } = useContext(AppContext);

  return (
    <footer
      className="footer"
      style={{
        "--text-decoration-color": tinycolor
          .mostReadable("#000000", [backgroundColor, foregroundColor])
          .toHexString(),
      }}
    >
      <h2 className="footer__title">
        Developed by {""}
        <a href="https://khizar.info" target="_blank">
          Khizar Hasan
        </a>
        {""} using following libraries:-
      </h2>

      <p>
        <a href="https://github.com/bgrins/TinyColor" target="_blank">
          Tiny Color
        </a>
        {""} by {""}
        <a href="https://github.com/bgrins" target="_blank">
          Brian Grinstead
        </a>
      </p>

      <p>
        <a href="https://github.com/tailwindlabs/headlessui" target="_blank">
          Headless UI
        </a>
        {""} by {""}
        <a href="https://github.com/tailwindlabs" target="_blank">
          Tailwind Labs
        </a>
      </p>

      <p>
        <a href="https://github.com/facebook/react" target="_blank">
          React
        </a>
        {""} by {""}
        <a href="https://github.com/facebook" target="_blank">
          Facebook
        </a>
      </p>

      <a
        className="githubLink"
        href="https://github.com/zarhasan/color-contrast-checker"
        target="_blank"
      >
        <GoMarkGithub />
        GitHub
        <FiExternalLink />
      </a>
    </footer>
  );
};

export default Footer;
