import { fetchJson } from '../utils/fetchJson.js';
import { createTeamMemberCard } from '../components/cards.js';

function setupTeamScrollReveal() {
  const teamMembers = document.querySelectorAll('.team-member');

  const checkVisibility = () => {
    const triggerBottom = window.innerHeight * 0.85;

    teamMembers.forEach((member) => {
      const boxTop = member.getBoundingClientRect().top;

      if (boxTop < triggerBottom) member.classList.add('show');
      else member.classList.remove('show');
    });
  };

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
}

function setupUpcomingEventsSlider(events) {
  const eventImage = document.getElementById('eventImage');
  const eventTitle = document.getElementById('eventTitle');
  const eventDate = document.getElementById('eventDate');
  const eventLocation = document.getElementById('eventLocation');
  const eventDescription = document.getElementById('eventDescription');
  const eventCounter = document.getElementById('eventCounter');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  if (!eventImage || !prevButton || !nextButton) return;

  let currentIndex = 0;

  const updateEvent = () => {
    const currentEvent = events[currentIndex];
    eventImage.src = currentEvent.image;
    eventImage.alt = currentEvent.title;
    eventTitle.textContent = currentEvent.title;
    eventDate.textContent = currentEvent.date;
    eventLocation.textContent = currentEvent.location;
    eventDescription.textContent = currentEvent.description;
    eventCounter.textContent = `Event ${currentIndex + 1} of ${events.length}`;
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % events.length;
    updateEvent();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + events.length) % events.length;
    updateEvent();
  };

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  updateEvent();
}

async function main() {
  // 1) Upcoming events (load from JSON)
  try {
    const eventsUrl = new URL('../../../data/events.json', import.meta.url);
    const events = await fetchJson(eventsUrl);
    if (Array.isArray(events) && events.length) setupUpcomingEventsSlider(events);
  } catch (err) {
    console.error('Events JSON error:', err);
  }

  // 2) Team members (load from JSON)
  try {
    const membersUrl = new URL('../../../data/members.json', import.meta.url);
    const members = await fetchJson(membersUrl);

    const container = document.getElementById('teamContainer');
    if (!container) return;

    container.innerHTML = '';
    (Array.isArray(members) ? members : []).forEach((m) => {
      container.appendChild(createTeamMemberCard(m));
    });

    setupTeamScrollReveal();
  } catch (err) {
    console.error('Members JSON error:', err);
  }
}

document.addEventListener('DOMContentLoaded', main);
