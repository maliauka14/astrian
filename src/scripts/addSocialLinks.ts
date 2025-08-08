import instagramSvg from "../assets/svg/instagram.svg?raw";
import linkedinSvg from "../assets/svg/linkedin.svg?raw";
import dribbleSvg from "../assets/svg/dribble.svg?raw";
import behanceSvg from "../assets/svg/behance.svg?raw";

interface SocialLink {
  name: string;
  url: string;
  svgContent: string;
}

export const socialLinks = [
  {
    name: "instagram",
    url: "https://instagram.com",
    svgContent: instagramSvg,
  },
  {
    name: "linkedin",
    url: "https://linkedin.com",
    svgContent: linkedinSvg,
  },
  {
    name: "dribble",
    url: "https://dribbble.com",
    svgContent: dribbleSvg,
  },
  {
    name: "behance",
    url: "https://behance.net",
    svgContent: behanceSvg,
  },
] as const;

const addSocialLink = (form: HTMLLIElement, socialData: SocialLink) => {
  const link = document.createElement("a");
  link.innerHTML = socialData.svgContent.trim();
  link.href = socialData.url;
  link.target = "_blank";

  const li = document.createElement("li");
  li.appendChild(link);
  li.classList.add("social-links__link");
  form.appendChild(li);
};

export const addSocialLinks = () => {
  const socialLinksForms =
    document.querySelectorAll<HTMLLIElement>(".social-links");
  socialLinksForms.forEach((form) => {
    socialLinks.forEach((link) => addSocialLink(form, link));
  });
};
