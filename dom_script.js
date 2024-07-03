var sections = [
    {
        section_name: 'Popular Artists',
        section_url: '#',
        section_type: 'artists',
        items: [
            {
                title: 'Abida Parveen',
                content: 'Artist',
                img: 'public/images/singers/abida.jpg'
            },
            {
                title: 'Ali Zafar',
                content: 'Artist',
                img: 'public/images/singers/ali.jpg'
            },
            {
                title: 'Bilal Sayeed',
                content: 'Artist',
                img: 'public/images/singers/bilal.jpg'
            },
            {
                title: 'Nusrat Fateh Ali Khan',
                content: 'Artist',
                img: 'public/images/singers/nusrat.webp'
            },
            {
                title: 'Atif Aslam',
                content: 'Artist',
                img: 'public/images/singers/atif.jpg'
            },
            {
                title: 'Sidhu Moose Wala',
                content: 'Artist',
                img: 'public/images/singers/mosywala.jpg'
            }
        ]
    },
    {
        section_name: 'Popular Albums',
        section_url: '#',
        section_type: 'albums',
        items: [
            {
                title: 'Ghost',
                content: 'Diljit',
                img: 'public/images/albums/ghost-diljit.jpeg'
            },
            {
                title: 'Making Memories',
                content: 'Karan Augla',
                img: 'public/images/albums/makingMemories-karanAugla.jpeg'
            },
            {
                title: 'Hit',
                content: 'Billie Eilish',
                img: 'public/images/albums/Hit-billie.jpeg'
            },
            {
                title: 'Moosetape',
                content: 'Sidhu Moose Wala',
                img: 'public/images/albums/moosetape-sidhuMoosewala.jpeg'
            },
            {
                title: 'Rockstart',
                content: 'Umair',
                img: 'public/images/albums/rockstart-umair.png'
            },
            {
                title: 'still Rollin',
                content: 'Shubh',
                img: 'public/images/albums/stillRollin-shubh.jpeg'
            }
        ]
    },
    {
        section_name: 'Popular Songs',
        section_url: '#',
        section_type: 'songs',
        items: [
            {
                title: "I Don't Wanna Wait",
                album: "I Don't Wanna Wait",
                artist: "David Guetta",
                img: "public/images/songs/I Don't Wanna Wait.jpg",
                song_url: "public/images/songs/I Don't Wanna Wait.m4a"
            },
            {
                title: "LET GO",
                album: "LET GO",
                artist: "Central Cee",
                img: "public/images/songs/let go.jpeg",
                song_url: "public/images/songs/LET GO.m4a"
            },
            {
                title: "Drugs From Amsterdam",
                album: "Mau P",
                artist: "Mau P",
                img: "public/images/songs/Drugs From Amsterdam.jpg",
                song_url: "public/images/songs/Drugs From Amsterdam.m4a"
            },
            {
                title: "Element",
                album: "Meet The Woo 2",
                artist: "Pop Smoke",
                img: "public/images/songs/Element.jpg",
                song_url: "public/images/songs/Element.m4a"
            },
            {
                title: "Ric Flair Drip (with Metro Boomin",
                album: "Without Warning",
                artist: "Offset & Metro Boomin",
                img: "public/images/songs/Ric Flair Drip (with Metro Boomin.jpeg",
                song_url: "public/images/songs/Ric Flair Drip (with Metro Boomin.m4a"
            },
            {
                title: "Tití Me Preguntó",
                album: "Un Verano Sin Ti",
                artist: "Bad Bunny",
                img: "public/images/songs/Tití Me Preguntó.jpg",
                song_url: "public/images/songs/Tití Me Preguntó.m4a"
            }

        ]
    }
]


function sectionDivCreator(heading, url, id) {
    let temp_div = document.createElement('div');
    const htmlString = `
    <div class="right-card-container-section" id="${id}">
        <div class="right-card-heading">
            <a href="${url}">${heading}</a>
            <a href="${url}">show all</a>
        </div>
        <div class="right-card-container">
        </div>
    </div>`;
    temp_div.innerHTML = htmlString;
    return temp_div.firstElementChild;
}


let artistSectionPromise = new Promise((resolve, reject) => {
    let artistSection = sectionDivCreator(sections[0].section_name, sections[0].section_url, sections[0].section_type);
    artistSection.classList.add('artist-cards-section');
    let container = artistSection.querySelector('.right-card-container');
    sections[0].items.forEach((item)=>{
        container.innerHTML += `
        <div class="right-card">
            <img src="${item.img}" alt="${item.title}">
            <button><img src="public/images/icons/play.svg" alt=""></button>
            <h2>${item.title}</h2>
            <p>${item.content}</p>
        </div>
        `
    })
    resolve(artistSection);
});

let albumSectionPromise = new Promise((resolve, reject) => {
    let albumSection = sectionDivCreator(sections[1].section_name, sections[1].section_url, sections[1].section_type);
    let container = albumSection.querySelector('.right-card-container');
    sections[1].items.forEach((item)=>{
        container.innerHTML += `
        <div class="right-card">
            <img src="${item.img}" alt="${item.title}">
            <button><img src="public/images/icons/play.svg" alt=""></button>
            <h2>${item.title}</h2>
            <p>${item.content}</p>
        </div>
        `
    })
    resolve(albumSection);
});

let songSectionPromise = new Promise((resolve, reject) => {
    let songSection = sectionDivCreator(sections[2].section_name, sections[2].section_url, sections[2].section_type);
    let container = songSection.querySelector('.right-card-container');
    sections[2].items.forEach((item)=>{
        container.innerHTML += `
        <div class="right-card" data-songUrl="${item.song_url}" data-title="${item.title}" data-artist="${item.artist}" data-album="${item.album}">
            <img src="${item.img}" alt="${item.title}">
            <button><img src="public/images/icons/play.svg" alt=""></button>
            <h2>${item.title}</h2>
            <p>${item.artist}</p>
        </div>
        `
    })
    resolve(songSection);
});


Promise.all([artistSectionPromise, albumSectionPromise, songSectionPromise]).then((values)=>{
    let playbar = document.querySelector('.playbar-container');
    values.forEach((value)=>{
        document.getElementById("right-side-container").insertBefore(value, playbar);
    })
})