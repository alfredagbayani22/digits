'use client';

import { Card, ListGroup } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

interface Note {
  id: number;
  note: string;
  contactId: number;
  owner: string;
  createdAt: Date;
}

interface ContactCardAdminProps {
  contact: Contact & { id: number; owner: string };
  notes: Note[];
}

/* Renders a single contact in a card format for admin view. */
const ContactCardAdmin = ({ contact, notes }: ContactCardAdminProps) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center">
      <Card.Img
        variant="top"
        src={contact.image}
        width={75}
        style={{ width: '75px', height: '75px', objectFit: 'cover' }}
        className="me-3"
      />
      <div>
        <Card.Title>
          {contact.firstName}
          {' '}
          {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
    <ListGroup variant="flush">
      {notes.map((note) => <NoteItem key={note.id} note={note} />)}
    </ListGroup>
    <AddNoteForm contactId={contact.id} />
  </Card>
);

export default ContactCardAdmin;
