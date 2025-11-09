'use client';

import { ListGroup } from 'react-bootstrap';

interface Note {
  id: number;
  contactId: number;
  note: string;
  owner: string;
  createdAt: Date;
}

interface NoteItemProps {
  note: Note;
}

/* Renders a single note in a ListGroup.Item format. */
const NoteItem = ({ note }: NoteItemProps) => (
  <ListGroup.Item>
    <p className="fw-lighter">{note.createdAt.toLocaleDateString('en-US')}</p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
