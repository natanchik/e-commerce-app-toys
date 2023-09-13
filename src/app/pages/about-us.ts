import Main from '../components/main';
import { createElement } from '../components/utils';

// const teammates: { [key: string]: string }[] = [
//   { name: 'Kristina Morozova', role: 'Developer', bio: '', github: 'https://github.com/kris-vadi' },
//   { name: 'Natalia Lebedeva', role: 'Developer', bio: '', github: 'https://github.com/natanchik' },
//   {
//     name: 'Irina Akhanteva',
//     role: 'Developer',
//     bio: `Novice frontend-developer with technical education. I became interested in programming by writing small scripts to automate routine operations and creating extensions for engineering software in Python. And one day I participated in the development of a small web application and from that moment I understood that I want to become web developer. I am constantly striving to learn new technologies and look to ways to better myself in the field of web development.`,
//     github: 'https://github.com/IrinaEnotova',
//   },
// ];

class AboutUS {
  public drawAboutUs(): HTMLDivElement {
    const aboutUs = createElement('div', ['about-us', 'main__wrapper', 'main__wrapper_thin']) as HTMLDivElement;
    const title = createElement('h2', ['about-us__title'], `We're Debug Girls 😊`) as HTMLDivElement;
    const decorator = Main.createTitleDecorator() as HTMLDivElement;
    const commonInfo = createElement(
      'div',
      ['about-us__common'],
      `
    <p class="main__blue-text paragraph about-us__common-info">We're an optimistic and gratitude-filled group of remote workers dedicated to creating a product people will use and love. <br><br> We desire to be better every day and know that improvement can be found in small changes. Daily communication and competent distribution of tasks allowed each teammate to work on all types of tasks - from creating page layouts to working with API. <br><br> We appreciate our teammates for the best teamwork ever. We are grateful to our cool mentors for their responsiveness and valuable advice and RS School for the training. <br><br> <a class="rs-school-logo" href="https://rs.school/" target="blank"></a></p>
    <div class="about-us__common-img"></div>
    `,
    ) as HTMLDivElement;
    const teamTitle = createElement('h2', ['about-us__team-title'], `MEET OUR TEAM`) as HTMLDivElement;

    const content = createElement('div', ['about-us__content']) as HTMLDivElement;
    content.append(commonInfo, teamTitle);

    aboutUs.append(title, decorator, content);
    return aboutUs;
  }

  private drawTeammate(): HTMLDivElement {
    const wrapper = createElement('div', ['teammate-block']) as HTMLDivElement;

    return wrapper;
  }
}

export default AboutUS;
