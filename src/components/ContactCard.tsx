'use client';

import { Card, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Contact } from '@/lib/validationSchemas';
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

interface Note {
  id: number;
  contactId: number;
  note: string;
  owner: string;
  createdAt: Date;
}

interface ContactCardProps {
  contact: Contact;
  notes: Note[];
}

/* Renders a single contact in a card format. */
const ContactCard = ({ contact, notes }: ContactCardProps) => (
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
      <ListGroup variant="flush">
        {notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </ListGroup>
      <AddNoteForm contactId={contact.id || 0} />
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
