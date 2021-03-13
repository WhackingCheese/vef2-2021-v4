import { format } from 'date-fns';

export function element(name, attributes = null, events = null, ...children) {
  const e = document.createElement(name);

  for (const child of children) {
    if (!child) {
      continue;
    }

    if (attributes) {
      for (const attrib in attributes) {
        e.setAttribute(attrib, attributes[attrib]);
      }
    }

    if (events) {
      for (const event in events) {
        e.addEventListener(event, events[event]);
      }
    }

    if (typeof child === 'string') {
      e.appendChild(document.createTextNode(child));
    } else {
      e.appendChild(child);
    }
  }

  return e;
}

export function el(name, ...children) {
  return element(name, null, null, ...children);
}

export function formatDate(timestamp) {
  return format(new Date(timestamp), 'dd.MM.yyyy HH:mm:ss');
}

export function toISL(period) {
  switch (period) {
    case 'month':
      return 'síðasta mánuð.';
    case 'week':
      return 'síðustu viku.';
    case 'day':
      return 'síðasta sólarhring.';
    case 'hour':
      return 'síðustu klukkustund.';
  }
}

export function toSize(type) {
  switch (type) {
    case 'significant':
      return 'verulega jarðskjálfta';
    case 'all':
      return 'alla jarðskjálfta';
    default:
      return `skjalfta að stærð ${type}M+`;
  }
}
