'use client';

import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

interface ContactCardProps {
  contact: Contact & { id: number };
}

/* Renders a single contact in a card format. */
const ContactCard = ({ contact }: ContactCardProps) => (
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
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
