'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddNoteSchema } from '@/lib/validationSchemas';
import { addNote } from '@/lib/dbActions';

interface AddNoteFormProps {
  contactId: number;
}

const onSubmit = async (data: {
  note: string;
  contactId: number;
  owner: string;
}) => {
  console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addNote(data);
};

const AddNoteForm = ({ contactId }: AddNoteFormProps) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
  });

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <textarea
              {...register('note')}
              className={`form-control ${errors.note ? 'is-invalid' : ''}`}
              rows={3}
            />
            <div className="invalid-feedback">{errors.note?.message}</div>
          </Form.Group>
          <input type="hidden" {...register('contactId')} value={contactId} />
          <input type="hidden" {...register('owner')} value={currentUser} />
          <Form.Group className="form-group">
            <Row className="pt-3">
              <Col>
                <Button type="submit" variant="success">
                  Add Note
                </Button>
              </Col>
              <Col>
                <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                  Reset
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
