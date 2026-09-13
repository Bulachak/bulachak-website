// @polsia:user-owned — athlete intake form island. Mounted by
// src/app/(custom)/intake/athlete/page.tsx. Submits to /api/athlete-leads
// via apiFetch; flips to a success view on 201.

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { apiFetch } from '@/lib/api-client';
import {
  AthleteLeadCreate,
  AthleteLeadItem,
  TRANSITION_STAGES,
  type TransitionStage,
} from '@/lib/contracts/athlete-leads';
import { applyServerErrors } from '@/lib/forms';

const TRANSITION_LABELS: Record<TransitionStage, string> = {
  pre_retirement: 'Pre-retirement',
  early: 'Early transition',
  mid: 'Mid transition',
  late: 'Late transition',
};

export function AthleteIntakeForm() {
  const [success, setSuccess] = useState<AthleteLeadItem | null>(null);

  const form = useForm<AthleteLeadCreate>({
    resolver: zodResolver(AthleteLeadCreate),
    defaultValues: {
      name: '',
      email: '',
      sport: '',
      transitionStage: undefined,
      targetVenture: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(values: AthleteLeadCreate) {
    try {
      const created = await apiFetch('/api/athlete-leads', {
        method: 'POST',
        body: JSON.stringify(values),
        schema: AthleteLeadItem,
      });
      setSuccess(created);
      toast.success('Thanks — we have your intake.');
      form.reset({
        name: '',
        email: '',
        sport: '',
        transitionStage: undefined,
        targetVenture: '',
      });
    } catch (err) {
      const applied = applyServerErrors((err as Error & { cause?: unknown }).cause, form.setError);
      if (!applied) {
        toast.error('Something went wrong. Please try again.');
      }
    }
  }

  if (success) {
    return (
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="flex flex-col gap-5 p-6 md:p-10">
          <div className="flex items-center gap-3 text-eyebrow font-mono text-muted-foreground">
            <span>INTAKE · RECEIVED</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <span>Reply within 2 working days</span>
          </div>
          <h2 className="font-display text-h2 tracking-tight">
            Thanks, {success.name} — we have it.
          </h2>
          <p className="max-w-xl text-body-lg text-muted-foreground">
            An A4A strategist will reply within two working days with a 20-minute intake slot for
            your post-career operating thesis. No prep deck required.
          </p>
          <Separator />
          <div className="flex flex-col gap-3 text-body text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Submission ID</span>
              <span className="font-mono text-small text-foreground">{success.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Reply window</span>
              <span className="font-mono">2 working days</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Intake length</span>
              <span className="font-mono">20 min</span>
            </div>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="shadow-brand">
              <Link href="/pricing">See pricing tiers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#tracks">Back to tracks</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card shadow-md">
      <CardContent className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex items-center gap-3 text-eyebrow font-mono text-muted-foreground">
          <span>FORM · FIVE FIELDS</span>
          <span aria-hidden className="h-px w-8 bg-border" />
          <span>Strictly B2B</span>
        </div>

        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>Operating principal or family-office contact.</FormDescription>
                  <FormControl>
                    <Input autoComplete="name" placeholder="M. Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work email</FormLabel>
                  <FormDescription>
                    We send the confirmation here and the strategist replies from a working A4A
                    address.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@operating-company.example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport &amp; career arc</FormLabel>
                  <FormDescription>
                    Discipline and the retirement window you are operating against.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="e.g. Track cycling, post-2024 Athens cycle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transitionStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transition stage</FormLabel>
                  <FormDescription>
                    Where you sit in the post-career arc — sets the engagement shape.
                  </FormDescription>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSITION_STAGES.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {TRANSITION_LABELS[stage]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetVenture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target venture</FormLabel>
                  <FormDescription>
                    One paragraph: what the post-career business you are standing up is meant to do.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="e.g. A custom-cervical collar studio that contracts directly with NGBs and federations; bespoke cycling apparel for the post-career athlete; an adaptive-program outreach operation."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-small text-muted-foreground">
                We write to <span className="font-mono text-foreground">a4a-b2b@polsia.app</span> —
                never to the athlete as a consumer.
              </p>
              <Button
                type="submit"
                size="lg"
                className="shadow-brand sm:w-auto"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Sending…' : 'Send intake'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
