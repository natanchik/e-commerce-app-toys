import Main from '../components/main';
import { createElement } from '../components/utils';

const teammates: { [key: string]: string }[] = [
  {
    name: 'Kristina Morozova',
    role: 'Developer',
    bio: `Novice frontend-developer with technical education. I became interested in programming by writing small scripts to automate routine operations and creating extensions for engineering software in Python. And one day I participated in the development of a small web application and from that moment I understood that I want to become web developer. I am constantly striving to learn new technologies and look to ways to better myself in the field of web development.`,
    github: 'https://github.com/kris-vadi',
    telegram: 'https://t.me/@kristinavadi',
  },
  {
    name: 'Natalia Lebedeva',
    role: 'Developer',
    bio: `Novice frontend-developer with technical education. I became interested in programming by writing small scripts to automate routine operations and creating extensions for engineering software in Python. And one day I participated in the development of a small web application and from that moment I understood that I want to become web developer. I am constantly striving to learn new technologies and look to ways to better myself in the field of web development.`,
    github: 'https://github.com/natanchik',
    telegram: 'https://t.me/@natanchik1',
  },
  {
    name: 'Irina Akhanteva',
    role: 'Developer',
    bio: `Novice frontend-developer with technical education. I became interested in programming by writing small scripts to automate routine operations and creating extensions for engineering software in Python. And one day I participated in the development of a small web application and from that moment I understood that I want to become web developer. I am constantly striving to learn new technologies and look to ways to better myself in the field of web development.`,
    github: 'https://github.com/IrinaEnotova',
    telegram: 'https://t.me/irinaenotova',
  },
];

class AboutUS {
  public drawAboutUs(): HTMLDivElement {
    const aboutUs = createElement('div', ['about-us', 'main__wrapper', 'main__wrapper_thin']) as HTMLDivElement;
    const title = createElement('h2', ['about-us__title'], `We're Debug Girls 😊`) as HTMLDivElement;
    const decorator = Main.createTitleDecorator() as HTMLDivElement;
    const commonInfoWrapper = createElement('div', ['about-us__common']) as HTMLDivElement;
    const commonParagWrapper = createElement(
      'div',
      ['about-us__common-info'],
      `
    <p class="paragraph">We're an optimistic and gratitude-filled group of remote workers dedicated to creating a product people will use and love.</p>
    <p class="paragraph">We desire to be better every day and know that improvement can be found in small changes. Daily communication and competent distribution of tasks allowed each teammate to work on all types of tasks - from creating page layouts to working with API.</p>
    <p class="paragraph">We appreciate our teammates for the best teamwork ever. We are grateful to our cool mentors for their responsiveness and valuable advice and RS School for the training.</p>
    <a class="rs-school-logo" href="https://rs.school/" target="blank"></a>`,
    );
    const commonImg = createElement('div', ['about-us__common-img']);
    const teamTitle = createElement('h2', ['about-us__team-title'], `MEET OUR TEAM`) as HTMLDivElement;
    const content = createElement('div', ['about-us__content']) as HTMLDivElement;

    commonInfoWrapper.append(commonParagWrapper, commonImg);
    content.append(commonInfoWrapper, teamTitle);
    teammates.forEach((teammate, idx) => {
      content.append(this.drawTeammate(teammate, idx));
    });
    aboutUs.append(title, decorator, content);
    return aboutUs;
  }

  private drawTeammate(teammate: { [key: string]: string }, idx: number): HTMLDivElement {
    const wrapper = createElement('div', ['teammate-block']) as HTMLDivElement;

    const imgBlock = createElement('div', ['teammate_img-block']) as HTMLDivElement;
    const img = createElement('div', [`teammate_img-${idx}`]) as HTMLDivElement;
    const socials = createElement('div', ['teammate_socials']) as HTMLDivElement;
    const github = createElement('a', ['teammate_socials-github'], '', {
      href: `${teammate.github}`,
      target: 'blank',
    }) as HTMLLinkElement;
    const telegram = createElement('a', ['teammate_socials-telegram'], '', {
      href: `${teammate.telegram}`,
      target: 'blank',
    }) as HTMLLinkElement;

    socials.append(github, telegram);
    imgBlock.append(img, socials);

    const infoBlock = createElement('div', ['teammate_info-block']) as HTMLDivElement;
    const teammateName = createElement('div', ['teammate_info-name'], `${teammate.name}`) as HTMLDivElement;
    const teammateRole = createElement('div', ['teammate_info-role'], `${teammate.role}`) as HTMLDivElement;
    const teammateBio = createElement('div', ['teammate_info-bio', 'paragraph'], `${teammate.bio}`) as HTMLDivElement;

    infoBlock.append(teammateName, teammateRole, teammateBio);

    wrapper.append(imgBlock, infoBlock);
    return wrapper;
  }
}

export default AboutUS;
