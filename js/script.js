let jsonData = `
{
  "articles": [
      {
          "id": 27252,
          "title": "Expending the Expendables: More launch companies are betting their future on reusability",
          "image_url": "https://i0.wp.com/spacenews.com/wp-content/uploads/2024/11/GZ45r9MagAAPXbL-scaled.jpeg",
          "summary": "Almost no one thought SpaceX would make the catch, at least not on the first try. On the fifth integrated test flight of Starship, launched Oct. 13 from the company’s […]",
          "published_at": "2024-11-11T13:00:00Z",
          "views":100
      },
      {
          "id": 27251,
          "title": "Chinese commercial Lijian-1 rocket launches 15 satellites",
          "image_url": "https://i0.wp.com/spacenews.com/wp-content/uploads/2024/11/Shiyan25ABC-etc-Lijian1-JSLC-11nov2024-CASSpace-1.jpg",
          "summary": "HELSINKI — A Chinese commercial rocket sent 15 satellites into orbit late Sunday, including launch service provider CAS Space’s first international payload. The Lijian-1 (Kinetica-1) solid rocket lifted off at […]",
          "published_at": "2024-11-11T12:29:28Z",
          "views":100
      },
      {
          "id": 27250,
          "title": "Arianespace Pushes Second Flight of Ariane 6 to February 2025",
          "image_url": "https://europeanspaceflight.com/wp-content/uploads/2024/11/Arianespace-Pushes-Second-Flight-of-Ariane-6-to-February-2025.jpg",
          "summary": "Arianespace has announced that it will not attempt the second flight of its Ariane 6 rocket in 2024, with the launch now pushed to no earlier than February 2025. Ariane 6 was launched for the first time in July 2024. While the flight was labeled a success by Arianespace, an anomaly during the flight prevented […]",
          "published_at": "2024-11-11T10:21:12Z",
          "views":100
      },
      {
          "id": 27249,
          "title": "Interview with OCEANOS Instructor María Fernanda Barbarena-Arias",
          "image_url": "https://www.nasa.gov/wp-content/uploads/2024/11/1q4a4494.jpg?w=2048",
          "summary": "What is your name and your role with OCEANOS? My name is María Fernanda Barbarena-Arias. I am an associate professor of biology at the American University of Puerto Rico, Metropolitan Campus. I am also a co-PI in the OCEANOS project, and an instructor and mentor for the students during the internship. What is the importance […]",
          "published_at": "2024-11-11T09:44:53Z",
          "views":100
      },
      {
          "id": 27246,
          "title": "Interview with OCEANOS Instructor Samuel Suleiman",
          "image_url": "https://www.nasa.gov/wp-content/uploads/2024/11/img-2293.jpg?w=2048",
          "summary": "What is your name and your role with OCEANOS? My name is Samuel Suleiman and I am the Executive Director of Sociedad Ambiente Marino: an NGO in Puerto Rico that has been working for the last 25 years to conserve our coastline and our reefs. During the OCEANOS internship, I am one of the Co-PIs […]",
          "published_at": "2024-11-11T09:36:07Z",
          "views":100
      },
      {
          "id": 27247,
          "title": "Interview with OCEANOS Instructor Roy Armstrong",
          "image_url": "https://www.nasa.gov/wp-content/uploads/2024/11/1q4a1721.jpg?w=2048",
          "summary": "What is your name and your role with OCEANOS? My name is Ray Armstrong and I am a professor in the Department of Marine Sciences of the University of Puerto Rico. I came to be involved in OCEANOS because my ex-student and good friend Juan Torres-Perez, who works at NASA Ames Research Center, came up […]",
          "published_at": "2024-11-11T09:35:49Z",
          "views":100
      },
      {
          "id": 27248,
          "title": "Interview with OCEANOS PI Juan Torres-Pérez",
          "image_url": "https://www.nasa.gov/wp-content/uploads/2024/11/1q4a4282.jpg?w=2048",
          "summary": "What is your name and your role with OCEANOS? My name is Juan Torres-Pérez. I am a research scientist at NASA Ames Research Center in the Earth Sciences division, biospheric sciences branch. I am the PI of OCEANOS, which stands for Ocean Community Engagement and Awareness with NASA Observations and Science for Hispanic/Latino students. What […]",
          "published_at": "2024-11-11T09:35:23Z",
          "views":100
      },
      {
          "id": 27245,
          "title": "Live coverage: SpaceX to launch Koreasat-6A on Falcon 9 rocket from the Kennedy Space Center",
          "image_url": "http://spaceflightnow.com/wp-content/uploads/2024/11/20241110_koreasat-6a_render_small.jpeg",
          "summary": "Liftoff of the Koreasat-6A mission from Launch Complex 39A (LC-39A) at NASA’s Kennedy Space Center is set for 12:07 p.m. EST (1707 UTC).",
          "published_at": "2024-11-11T00:55:22Z",
          "views":100
      },
      {
          "id": 27244,
          "title": "Spaceplane developer Reaction Engines goes bankrupt",
          "image_url": "https://i0.wp.com/spacenews.com/wp-content/uploads/2014/11/SkylonSabre2_RE4X3_0.jpg",
          "summary": "Reaction Engines Ltd., a British company that has worked for decades on an air-breathing rocket engine for spaceplanes and other hypersonic vehicles, has filed for bankruptcy.",
          "published_at": "2024-11-11T00:26:05Z",
          "views":100
      },
      {
          "id": 27243,
          "title": "What’s Happening in Space Policy November 10-16, 2024",
          "image_url": "https://spacepolicyonline.com/wp-content/uploads/2024/11/John-Thune-240x300.jpg",
          "summary": "Here is SpacePolicyOnline.com’s list of space policy events for the week of November 10-16, 2024 and any insight we can offer about them. The House and Senate return to work...",
          "published_at": "2024-11-10T23:19:21Z",
          "views":100
      }
  ]
}`;

let data = JSON.parse(jsonData);

let container = document.getElementById('articles-container');

data.articles.forEach((article) => {
    let articleHTML = `
    <div class="col-md-4 mb-5">
        <div class="card h-100">
        <img src="${article.image_url}" alt="Article Image" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${article.title}</h2>
                <p class="card-text">${article.summary}</p>
            </div>
            <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">More Info</a></div>
        </div>
    </div>`;

    container.innerHTML += articleHTML;
});
