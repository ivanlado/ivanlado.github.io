
document.addEventListener('DOMContentLoaded', function () {
  // Fetch the JSON data
  console.log('Fetching portfolio data...');
  fetch('../../../info.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Once we have the data, populate the page
      populatePortfolio(data);
    })
    .catch(error => {
      console.error('Error loading portfolio data:', error);
    });
});



function populatePortfolio(data) {
  // // Set document title
  document.title = data.meta.title;

  // // Populate profile section
  document.querySelector('.hero-2 .title.is-1').textContent = data.profile.name;
  document.querySelector('.hero-2 .subtitle').innerHTML = data.profile.title + '<br>' + data.profile.subtitle;
  // document.querySelector('.hero .image img').src = data.profile.image;
  // document.querySelector('.hero a[href^="docs/"]').href = data.profile.resume;

  // Populate about section
  document.getElementById('about-me').textContent = data.about.content;

  // // Populate social links
  // const githubLinks = document.querySelectorAll('a[href*="github.com"]');
  // githubLinks.forEach(link => {
  //   link.href = data.social.github.url;
  // });

  // const webLinks = document.querySelectorAll('a[href*="fullstackmark.com"]');
  // webLinks.forEach(link => {
  //   link.href = data.social.website.url;
  //   if (link.parentElement.querySelector('.heading')) {
  //     link.parentElement.querySelector('.heading a').textContent = new URL(data.social.website.url).hostname;
  //     link.parentElement.querySelector('.heading a').href = data.social.website.url;
  //   }
  // });

  // const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  // emailLinks.forEach(link => {
  //   link.href = `mailto:${data.social.email.address}`;
  //   if (link.parentElement.querySelector('.heading')) {
  //     link.parentElement.querySelector('.heading a').textContent = data.social.email.address;
  //     link.parentElement.querySelector('.heading a').href = `mailto:${data.social.email.address}`;
  //   }
  // });

  // const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
  // linkedinLinks.forEach(link => {
  //   link.href = data.social.linkedin.url;
  // });

  // // Populate education section
  // const educationContainer = document.querySelector('.container-education');
  // educationContainer.innerHTML = ''; // Clear existing content

  // data.education.forEach((edu, index) => {
  //   const cardClasses = index === 0 ? 'card card-education' : 'card card-gap card-education';

  //   let detailsHtml = '';
  //   if (edu.details && edu.details.length > 0) {
  //     detailsHtml = '<ul>' + 
  //       edu.details.map(detail => `<li><b>${detail.title}: </b>${detail.description}</li>`).join('') +
  //       '</ul>';
  //   } else if (edu.description) {
  //     detailsHtml = `<p>${edu.description}</p>`;
  //   }

  //   const educationHtml = `
  //     <div class="${cardClasses}">
  //       <div class="card-content">
  //         <div class="content">
  //           <p class="title is-4">${edu.degree}</p>
  //           <p class="subtitle is-6">${edu.institution} | <time datetime="${edu.startDate}">${edu.startDate}</time> - 
  //             <time datetime="${edu.endDate}">${edu.endDate}</time> | ${edu.credits} | GPA: ${edu.gpa}</p>
  //         </div>
  //         <div class="content">
  //           ${detailsHtml}
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   educationContainer.innerHTML += educationHtml;
  // });

  // Populate experience section
  const experienceContainer = document.querySelector('.section:nth-of-type(3) .container-education');
  experienceContainer.innerHTML = ''; // Clear existing content

  data.experience.forEach((exp, index) => {
    const cardClasses = index === 0 ? 'card card-education' : 'card card-gap card-education';

    const responsibilitiesHtml = exp.responsibilities.map(resp => `<li>${resp}</li>`).join('');
    const skillsHtml = exp.skills.map(skill => `<span class="tag">${skill}</span>`).join('');

    const experienceHtml = `
      <div class="${cardClasses}">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="${exp.logo}" alt="${exp.title} Logo">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">${exp.title}</p>
              <p class="subtitle is-6">${exp.position} - <time datetime="${exp.startDate}">${exp.startDate}</time>${exp.endDate ? ' - <time datetime="' + exp.endDate + '">' + exp.endDate + '</time>' : ''}</p>
            </div>
          </div>
          <div class="content">
            <p>${exp.description}</p>
            <ul>
              ${responsibilitiesHtml}
            </ul>
            <div class="tags">
              ${skillsHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    experienceContainer.innerHTML += experienceHtml;
  });

  // Populate projects section
  const projectTiles = document.querySelectorAll('.section:nth-of-type(4) .tile.is-parent');
  // generateTiles(data.projects); // Generate the project tiles
  data.projects.forEach((project, index) => {
    if (index < projectTiles.length) {
      const tile = projectTiles[index];
      tile.querySelector('.title').textContent = project.title;
      tile.querySelector('img').src = project.image;

      // Update modal content
      const modalId = `project-${index + 1}-modal`;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.querySelector('.modal-card-title').textContent = project.title;

        const numberImagesCarousel = project.carousel.length;
        const carouselContainer = modal.querySelector('.carousel'); // Get the carousel container element
        carouselContainer.innerHTML = '';

        

        // Loop through the project.carousel array and create new figure elements with images
        for (let i = 0; i < numberImagesCarousel; i++) {
          const newCell = document.createElement('figure'); // Create a new <figure> element
          newCell.classList.add('carousel-cell'); // Add the carousel-cell class to it

          const newImg = document.createElement('img'); // Create a new <img> element
          newImg.src = project.carousel[i]; // Set the image source from the JSON array

          newCell.appendChild(newImg); // Append the image to the <figure>
          carouselContainer.appendChild(newCell); // Append the <figure> to the carousel container
        }

        // Update description and skills
        modal.querySelector('.content > p').textContent = project.description;

        const tagsContainer = modal.querySelector('.tags');
        tagsContainer.innerHTML = project.skills.map(skill => `<span class="tag">${skill}</span>`).join('');
      }
    }
  });




}









function generateTiles(tiles) {
  const container = document.getElementById('projects-tiles-container');
  container.innerHTML = ""; // Clear any existing content
  container.innerHTML = '<h1 class="title">Projects</h1><hr/>';


  const rows = Math.ceil(tiles.length / 3); // Number of rows (2 columns in the original, so 3 items per row)

  const numberCols = (tiles.length % 3 === 0) ? 3 : 2;

  for (let i = 0; i < rows; i++) {
    // Create a row for each set of 3 tiles
    const row = document.createElement('div');
    row.classList.add('tile', 'is-ancestor');

    const verticalTile = document.createElement('div');
    verticalTile.classList.add('tile', 'is-vertical', 'is-12');
    row.appendChild(verticalTile);

    const anotherTile = document.createElement('div');
    anotherTile.classList.add('tile')
    verticalTile.appendChild(anotherTile);

    // Loop through the tiles in each row
    for (let j = 0; j < numberCols; j++) {
      const index = i * numberCols + j;
      if (index >= tiles.length) break; // If there are fewer tiles than expected
      console.log(i, j);

      const tile = document.createElement('div');
      tile.classList.add('tile', 'is-parent');

      const article = document.createElement('article');
      article.classList.add('tile', 'is-child', 'notification');

      const title = document.createElement('p');
      title.classList.add('title');
      title.textContent = tiles[index].title;

      const figure = document.createElement('figure');
      figure.classList.add('image');

      const img = document.createElement('img');
      img.classList.add('modal-trigger');
      img.setAttribute('data-target', `project-${index + 1}-modal`);
      img.setAttribute('src', tiles[index].image);

      figure.appendChild(img);
      article.appendChild(title);
      article.appendChild(figure);
      tile.appendChild(article);
      anotherTile.appendChild(tile);
    }

    container.appendChild(row); // Append the row to the container
  }
}
