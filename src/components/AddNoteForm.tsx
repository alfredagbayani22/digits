'use client';

import { useSession } from 'next-auth/react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';

interface AddNoteFormProps {
  contactId: number;
}

// eslint-disable-next-line react/prop-types
const AddNoteForm: React.FC<AddNoteFormProps> = ({ contactId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      contactId,
      owner: currentUser,
      note: '',
    },
  });

  const onSubmit = async (data: { note: string; contactId: number; owner: string }) => {
    console.log('Form submitted with data:', data);
    console.log('ContactId from props:', contactId);
    console.log('Current user:', currentUser);

    try {
      await addNote(data);
      console.log('addNote completed successfully');
      swal('Success', 'Your note has been added', 'success', {
        timer: 2000,
      });
      reset({ note: '', contactId, owner: currentUser });
    } catch (error) {
      console.error('Error adding note:', error);
      swal('Error', 'Failed to add note', 'error');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Button clicked!');
    handleSubmit(onSubmit)(e);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Add Timestamped Note</Form.Label>
        <input
          type="text"
          {...register('note')}
          className={`form-control ${errors.note ? 'is-invalid' : ''}`}
          placeholder="Enter your note"
        />
        <div className="invalid-feedback">{errors.note?.message}</div>
      </Form.Group>
      <input type="hidden" {...register('contactId')} />
      <input type="hidden" {...register('owner')} />
      <Button type="submit" variant="primary" size="sm">
        Submit
      </Button>
    </Form>
  );
};

export default AddNoteForm;
